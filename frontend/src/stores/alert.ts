// Utilities
import { defineStore } from 'pinia';
import { ref } from 'vue';

export type AlertType = 'error' | 'success' | 'info' | 'warning' | undefined;

export const useAlertStore = defineStore('alert', () => {
  const alert = ref(false);
  const alertType = ref<AlertType>();
  const alertMessage = ref('');
  const loading = ref(false);

  function resetAlert() {
    alert.value = false;
    alertType.value = undefined;
    alertMessage.value = '';
    loading.value = false;
  }

  function setLoading() {
    loading.value = true;
  }

  function disableLoading() {
    loading.value = false;
  }

  function setAlertState(type: AlertType, message?: string) {
    loading.value = false;
    alertType.value = type;

    if (!message) {
      alertMessage.value =
        type === 'success' ? 'Запрос выполнен успешно!' : 'Произошла ошибка!';
    } else alertMessage.value = message;

    if (type === 'success') {
      setTimeout(() => resetAlert(), 2500);
    }

    alert.value = true;
  }


  return {
    setAlertState,
    setLoading,
    disableLoading,
    resetAlert,
    loading,
    alert,
    alertType,
    alertMessage,
  };
});
