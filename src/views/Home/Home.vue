<template>
  <div class="d-flex flex-column h-100">
    <b-container class="home">
      <b-row class="hero-row">
        <b-col>
          <current-temperature
            :currentTemperature="$store.state.weather.current.temp"
            :currentFeelsLike="$store.state.weather.current.feels_like"
          ></current-temperature>
        </b-col>
        <b-col>
          <img
            @click="handleHeroIconClick"
            v-if="$store.getters.hasWeather"
            :src="iconToUrl($store.state.weather.current.weather[0].icon, '@2x')"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h6>Today's forecast</h6>
          <hourly-forecast class="forecast-list"></hourly-forecast>
        </b-col>
      </b-row>
      <b-row v-if="comingUpNotifications.length > 0" class="coming-up-row">
        <b-col>
          <h6>Coming up...</h6>
          <coming-up-list :notifications="comingUpNotifications"></coming-up-list>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h6>5-day forecast</h6>
          <daily-forecast class="forecast-list"></daily-forecast>
        </b-col>
      </b-row>
    </b-container>
    <div class="flex-grow-1"></div>
    <bottom-bar class="mb-2 mr-3"></bottom-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BottomBar from '@/views/Home/BottomBar.vue';
import CurrentTemperature from '@/components/CurrentTemperature.vue';
import DailyForecast from '@/components/DailyForecast.vue';
import ComingUpList from '@/components/ComingUpList.vue';
import HourlyForecast from '@/components/HourlyForecast.vue';
import { RootState } from '@/store/types';
import { Store } from 'vuex';
import ToastOptions from '@/services/ToastOptions';
import { UPDATE_WEATHER } from '@/store/actions';
import determineComingUpNotifications, { ComingUpNotification } from '@/services/ComingUpService';
import convert from '@/utils/ConversionUtils';
import HttpError from '@/services/HttpError';
import { differenceInMilliseconds } from 'date-fns';

@Component({
  components: {
    CurrentTemperature, DailyForecast, HourlyForecast, BottomBar, ComingUpList,
  },
  methods: {
    iconToUrl: convert.iconToUrl,
  },
})
export default class Home extends Vue {
  $store!: Store<RootState>

  // 15 minutes seems like a reasonable minimum refresh interval
  private readonly MIN_REFRESH_INTERVAL_MS = 15 * 60 * 1000;

  // Refresh after an hour to keep data from getting too out of date
  private readonly MAX_REFRESH_INTERVAL_MS = 60 * 60 * 1000;

  private comingUpNotifications: ComingUpNotification[] = [];

  // Initialize so that a refresh is "due" immediately
  private lastRefreshTime: Date = new Date(Date.now() - this.MIN_REFRESH_INTERVAL_MS);

  private autoRefreshTimeout!: number;

  private autoRefreshInterval!: number;

  handleHeroIconClick() {
    // This is a temporary demo to force the display of a 'coming up' notification
    // It can be removed when we implement the 'details' view for the header, or sooner
    // if desired.
    const demoNotifications = [
      {
        type: 'DEMORAIN',
        iconUrl: convert.iconToUrl('10d'),
        text: 'light rain coming up at 2PM',
      },
      {
        type: 'DEMOSNOW',
        iconUrl: convert.iconToUrl('13n'),
        text: 'snow tonight',
      },
    ];
    demoNotifications.forEach((demoNotification) => {
      const demoIndex = this.comingUpNotifications
        .findIndex((notification) => notification.type === demoNotification.type);
      if (demoIndex === -1) {
        this.comingUpNotifications.push(demoNotification);
      } else {
        this.comingUpNotifications.splice(demoIndex, 1);
      }
    });
  }

  async updateWeather() {
    try {
      await this.$store.dispatch(UPDATE_WEATHER);
      this.lastRefreshTime = new Date();
    } catch (err) {
      if (err instanceof HttpError && err.httpStatusCode === 401) {
        this.$router.push('/settings');
      } else {
        this.$bvToast.toast('I\'m sorry, we couldn\'t load the weather for your location.', ToastOptions.errorToast);
      }
    }
    this.comingUpNotifications
      .splice(
        0,
        this.comingUpNotifications.length,
        ...determineComingUpNotifications(this.$store.state.weather),
      );
  }

  async mounted() {
    if (!this.$store.getters.hasApiKey) {
      this.$router.push('/settings');
    } else if (!this.$store.getters.hasLocation) {
      this.$router.push('/locations');
    }

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.handleVisibilityChange(); // do initial refresh and start the cooldown
  }

  beforeDestroy() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  async handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
      const msSinceLastRefresh = differenceInMilliseconds(new Date(), this.lastRefreshTime);

      // Update now only if we haven't since the min interval
      if (msSinceLastRefresh > this.MIN_REFRESH_INTERVAL_MS) {
        await this.updateWeather();

        // Start auto-refreshing every max interval
        this.autoRefreshInterval = window.setInterval(
          this.updateWeather, this.MAX_REFRESH_INTERVAL_MS,
        );
      } else {
        const nextAutoRefreshMs = this.MAX_REFRESH_INTERVAL_MS - msSinceLastRefresh;
        // Manually schedule the next refresh to happen max interval ms after
        // the most recent refresh
        this.autoRefreshTimeout = window.setTimeout(async () => {
          await this.updateWeather();
          // Start auto-refreshing every max interval
          this.autoRefreshInterval = window.setInterval(
            this.updateWeather, this.MAX_REFRESH_INTERVAL_MS,
          );
        }, nextAutoRefreshMs);
      }
    } else {
      // Don't auto-refresh when the page is not visible
      window.clearTimeout(this.autoRefreshTimeout);
      window.clearInterval(this.autoRefreshInterval);
    }
  }
}
</script>
<style scoped>
.home {
  max-width: 30rem;
  margin-top: 1rem;
}
.row {
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid lightgray;
}
.hero-row {
  justify-content: space-evenly;
  padding-bottom: 2rem;
}
.hero-row .col {
  flex-grow: unset;
}
h6 {
  text-align: left;
  font-size: x-small;
  font-weight: bold;
}
.forecast-list {
  white-space: nowrap;
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
}
.forecast-list::-webkit-scrollbar {
  display: none; /* Webkit */
}
.coming-up-row {
  background: #d8d8d8;
}
</style>
