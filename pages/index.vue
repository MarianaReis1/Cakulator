<template>
  <div class="tw-flex tw-h-fill tw-min-h-screen tw-text-white">
    <div
      class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-14 tw-w-full tw-py-8 tw-px-5 tw-max-w-[640px] tw-mx-auto tw-md:w-1/2 md:tw-p-14"
    >
      <h2 class="text-h5 tw-font-display tw-mb-auto">Baketown</h2>
      <div class="tw-flex tw-flex-col tw-gap-10 tw-max-h-48">
        <h1 class="text-h1 text-center tw-font-logo tw-text-dark text-sm">
          Cakulator
        </h1>
        <h3
          class="text-h6 text-weight-light tw-leading-normal tw-max-w-sm tw-text-dark tw-text-center tw-uppercase"
        >
          the easy way to save your cake recipes and create the grocery list you
          need
        </h3>
      </div>
      <div
        class="tw-mt-auto tw-flex tw-flex-col tw-gap-3 tw-items-center tw-justify-center md:tw-gap-5"
      >
        <UtilsBtnPrimary href="/cakes">Add cake</UtilsBtnPrimary>

        <UtilsBtnSecondary href="/cakes">View my cakes</UtilsBtnSecondary>
      </div>
    </div>
    <div class="tw-w-1/2 tw-hidden md:tw-block">
      <img src="/cake.jpg" alt="" class="tw-object-cover tw-h-full tw-w-full" />
    </div>
  </div>
</template>

<style lang="scss">
@media (max-width: $breakpoint-sm-max) {
  .text-h1 {
    font-size: 70px;
  }
}
</style>
