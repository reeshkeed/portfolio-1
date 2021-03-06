<template>
  <nav class="navbar"
    :class="navbarClass"
  >
    <div class="container">
      <div class="navbar-brand">
        <router-link
          class="navbar-item"
          aria-label="Go to Homepage"
          to="/"
        >
          <img
            src="@/assets/svg/logo.svg"
            alt="Logo"
            svg-inline
          />
        </router-link>

        <a role="button" class="navbar-burger burger"
          @click.prevent="toggleMenu()"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        class="navbar-menu"
        :class="{ 'is-active': menuActive }"
      >
        <div class="navbar-start">
          <router-link class="navbar-item"
            v-for="(link, i) in links"
            :key="i"
            :to="link.target"
            :class="{ 'is-active': activeNavItem == i }"
            @click="closeMenu()"
          >
            {{ link.name }}
          </router-link>
        </div>

        <div class="navbar-end">
          <a href="https://blog.raphaelmarco.com" class="navbar-item">Blog</a>

          <a
            href="https://github.com/pinodex"
            class="navbar-item is-external"
            target="_blank"
            rel="noopener"
          >
            Github
          </a>

          <router-link
            class="navbar-item"
            :to="{ name: 'contact' }"
            :class="{ 'is-active': $route.name == 'contact' }"
          >
            Contact
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    menuActive: false,
  }),

  props: {
    fixed: {
      type: Boolean,
      default: false,
    },

    collapsed: {
      type: Boolean,
      default: false,
    },

    autohideBrand: {
      type: Boolean,
      default: true,
    },

    links: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    navbarClass() {
      return {
        'is-fixed-top': this.fixed,
        'is-collapsed': this.computedCollapsed,
        'is-white': this.computedCollapsed,
        'is-dark': !this.computedCollapsed,
        'is-transparent': !this.computedCollapsed,
        'is-brand-autohide': this.autohideBrand,
      };
    },

    computedCollapsed() {
      return this.collapsed || this.menuActive;
    },

    activeNavItem() {
      const name = this.$route.name || '';

      return this.links.findIndex(({ target }) => name.indexOf(target.name) !== -1);
    },
  },

  watch: {
    menuActive(state) {
      this.$emit('menu', state);
    },
  },

  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },

    closeMenu() {
      this.menuActive = false;
    },
  },
};
</script>

<style lang="sass" scoped>
.navbar
  +desktop
    height: #{$navbar-height + 2rem}

  transition: all .3s ease

  &.is-dark
    background-color: transparent

  &.is-white
    border-bottom: 3px solid #eee

  &.is-collapsed
    +desktop
      height: $navbar-height

    .navbar-start,
    .navbar-end
      & > a.navbar-item
        &:hover
          background-color: transparent
          color: $link

        &.is-active
          background-color: transparent
          color: $link

          +desktop
            box-shadow: inset 0 -3px 0 $link

  &.is-transparent
    .navbar-start,
    .navbar-end
      & > a.navbar-item:hover
        color: $white

        +desktop
          box-shadow: inset 0 -3px 0 $white

  .navbar-brand,
  .navbar-start,
  .navbar-end
    & > .navbar-item,
    & > .navbar-link
      font-weight: 400
      letter-spacing: 1px
      text-transform: uppercase
      transition: all .3s ease
      text-align: center

      &.is-external
        &::after
          font-family: 'icomoon'
          font-size: 0.9rem
          content: '\e905'
          margin-left: 5px

          +desktop
            overflow: hidden
            max-width: 0px
            transition: max-width .3s ease

        &:hover::after
          max-width: 20px

  .navbar-brand > .navbar-item
    font-weight: 600

    svg
      max-height: initial
      width: 50px

  +desktop
    .navbar-brand
      transition: width .3s ease
      overflow: hidden
      width: 0px

    &:not(.is-brand-autohide) .navbar-brand,
    &.is-collapsed .navbar-brand
      width: 80px
</style>
