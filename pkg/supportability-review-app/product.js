import {
  SUPPORTABILITY_REVIEW_PRODUCT_NAME,
  SUPPORTABILITY_REVIEW_CRD_IDS,
  SR_APP_PAGES,
} from "./config/types";
import { rootRoute, createRoute } from "./utils/custom-routing";

export function init($plugin, store) {
  const { product, configureType, virtualType, basicType } = $plugin.DSL(
    store,
    SUPPORTABILITY_REVIEW_PRODUCT_NAME,
    // SUPPORTABILITY_REVIEW_PRODUCT_FULL_NAME,
  );

  // app in sidebar
  product({
    icon: "service",
    inStore: "management",
    showClusterSwitcher: false,
    weight: 100,
    to: rootRoute(),
  });

  // dashboard menu entry in SR App
  virtualType({
    labelKey: "sr.menuLabels.dashboard",
    // label: store.getters["i18n/t"]("sr.menuLabels.dashboard"),
    name: SR_APP_PAGES.DASHBOARD,
    route: rootRoute(),
  });

  // defining a k8s resource as page
  configureType(SUPPORTABILITY_REVIEW_CRD_IDS.REVIEW_BUNDLE, {
    displayName: store.getters["i18n/t"](
      `typeLabel."${SUPPORTABILITY_REVIEW_CRD_IDS.REVIEW_BUNDLE}"`,
    ),
    isCreatable: true,
    isEditable: false,
    isRemovable: true,
    showAge: true,
    showState: true,
    canYaml: true,
  });

  virtualType({
    label: store.getters["i18n/t"]("sr.menuLabels.viewReport"),
    name: SR_APP_PAGES.VIEW_REPORT,
    route: createRoute("view-report"),
  });

  // registering the defined pages as side-menu entries
  basicType([
    // SR_APP_PAGES.DASHBOARD,
    SUPPORTABILITY_REVIEW_CRD_IDS.REVIEW_BUNDLE,
    // SR_APP_PAGES.VIEW_REPORT,
  ]);
}
