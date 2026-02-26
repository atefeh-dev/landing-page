<template>
  <div class="cf">
    <Transition :name="transitionName" mode="out-in">
      <StepTemplates
        v-if="step === 'templates'"
        key="templates"
        @next="onTemplateSelected"
      />
      <StepForm
        v-else-if="step === 'form'"
        key="form"
        :template-id="templateId"
        @next="onFormDone"
        @back="goBack('templates')"
      />
      <StepEmail v-else-if="step === 'email'" key="email" @next="onEmailDone" />
      <StepOtp
        v-else-if="step === 'otp'"
        key="otp"
        :email="email"
        @next="onOtpDone"
        @resend="onResend"
      />
      <StepSuccess
        v-else-if="step === 'success'"
        key="success"
        :template-id="templateId"
        @close="reset"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import StepTemplates from "./StepTemplates.vue";
import StepForm from "./StepForm.vue";
import StepEmail from "./StepEmail.vue";
import StepOtp from "./StepOtp.vue";
import StepSuccess from "./StepSuccess.vue";

const emit = defineEmits(["url-change"]);

const step = ref("templates");
const templateId = ref("NDA");
const email = ref("");
const transitionName = ref("cf-fade");

const urlMap = {
  templates: "zoonkan.com/templates/",
  form: "zoonkan.com/ccreate/NDA",
  email: "zoonkan.com/create/NDA/send",
  otp: "zoonkan.com/create/NDA/confirm",
  success: "zoonkan.com/create/NDA/success",
};

function goTo(newStep, url) {
  transitionName.value = "cf-fade";
  step.value = newStep;
  emit("url-change", url ?? urlMap[newStep]);
}

function goBack(newStep) {
  transitionName.value = "cf-fade";
  step.value = newStep;
  emit("url-change", urlMap[newStep]);
}

function onTemplateSelected(id) {
  templateId.value = id;
  goTo("form", `zoonkan.com/ccreate/${id}`);
}

function onFormDone() {
  goTo("email", `zoonkan.com/create/${templateId.value}/send`);
}

function onEmailDone(val) {
  email.value = val;
  goTo("otp", `zoonkan.com/create/${templateId.value}/confirm`);
}

function onOtpDone() {
  goTo("success", `zoonkan.com/create/${templateId.value}/success`);
}

function onResend() {}

function reset() {
  templateId.value = "NDA";
  email.value = "";
  goBack("templates");
}
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;

// The outer shell — fills the BrowserMockup body, centers everything
.cf {
  width: 100%;
  height: 100%;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

// ── Forward transition ─────────────────────────────────────────────
.cf-forward-enter-active,
.cf-forward-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  // Step components must not be block-level inside flex — keep them inline-flex
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cf-forward-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.cf-forward-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

// ── Back transition ────────────────────────────────────────────────
.cf-back-enter-active,
.cf-back-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cf-back-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.cf-back-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
