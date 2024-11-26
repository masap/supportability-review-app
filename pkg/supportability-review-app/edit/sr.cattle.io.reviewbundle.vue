<script>
import Loading from "@shell/components/Loading.vue";
import CruResource from "@shell/components/CruResource.vue";
import CreateEditView from "@shell/mixins/create-edit-view";
import { _CREATE, _EDIT } from "@shell/config/query-params";
import { exceptionToErrorsArray } from "@shell/utils/error";

export default {
  name: "ReviewBundleEditView",
  components: {
    Loading,
    CruResource,
  },
  mixins: [CreateEditView],
  props: {
    value: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: true,
    },
  },
  data() {
    if (!this.value.metadata.name) {
      this.value.metadata.generateName = "review-bundle-";
    }

    return {};
  },
  computed: {
    isCreate() {
      return this.mode === _CREATE;
    },
    isView() {
      return this.mode !== _CREATE && this.mode !== _EDIT;
    },
    editorMode() {
      if (!this.isView) {
        return EDITOR_MODES.EDIT_CODE;
      }

      return EDITOR_MODES.VIEW_CODE;
    },
    hasBeenCreated() {
      return !!this.value.id;
    },
  },
  methods: {},
};
</script>

<template>
  <Loading v-if="!value" />
  <CruResource
    v-else
    :done-route="doneRoute"
    :can-yaml="true"
    :mode="mode"
    :resource="value"
    :errors="errors"
    :validation-passed="isFormValid"
    @error="(e) => (errors = e)"
    @finish="save"
    @cancel="done"
  >
    <h1>EditView</h1>
  </CruResource>
</template>

<style scoped></style>
