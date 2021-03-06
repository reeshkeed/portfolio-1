<template>
  <div>
    <section class="section" v-if="meta">
      <div class="container">
        <div
          class="hero is-primary is-medium project-header has-border-radius"
          :style="headerStyle"
        >
          <div class="hero-body">
            <div class="content">
              <h1 class="title" v-html="meta.name"></h1>

              <p v-html="meta.description"></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="page-loader" v-if="!lab"></div>

    <section class="section" v-if="lab">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-8">
            <div class="content">
              <component
                :is="lab.default"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <hr />

    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-8">
            <div class="level">
              <div class="level-left">
                <div class="level-item" v-if="prev">
                  <div class="quick-prev">
                    <p class="has-text-weight-semibold">
                      <router-link
                        :to="{ name: 'labs.view', params: { slug: prev.slug } }"
                      >
                        {{ prev.name }}
                      </router-link>
                    </p>

                    <p class="has-text-grey-light">Previous</p>
                  </div>
                </div>
              </div>

              <div class="level-right">
                <div class="level-item" v-if="next">
                  <div class="quick-next">
                    <p class="has-text-weight-semibold">
                      <router-link
                        :to="{ name: 'labs.view', params: { slug: next.slug } }"
                      >
                        {{ next.name }}
                      </router-link>
                    </p>

                    <p class="has-text-grey-light">Next</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import labs from '@data/labs/index.json';

export default {
  data: () => ({
    lab: null,
  }),

  computed: {
    headerStyle() {
      return {
        backgroundImage: `
          linear-gradient(
            141deg,
            rgb(17, 40, 53) 0%,
            rgba(36, 59, 85, 0.75) 71%,
            rgba(40, 60, 107, 0.75) 100%
          ),

          url(${this.meta.thumbnail})
        `,
      };
    },

    index() {
      return labs.findIndex(({ slug }) => slug === this.$route.params.slug);
    },

    meta() {
      return labs[this.index];
    },

    prev() {
      return labs[this.index - 1];
    },

    next() {
      return labs[this.index + 1];
    },
  },

  watch: {
    meta(meta) {
      this.setPageTitle(meta.name);
    },
  },

  async mounted() {
    this.lab = await import(`@data/labs/${this.$route.params.slug}.md`);

    this.setPageTitle(this.meta.name);
  },
};
</script>

<style lang="sass" scoped>
::v-deep .window
  padding: 2rem

  @include touch
    padding: 2rem 0

.project-header
  background-size: cover
  background-position: center
</style>
