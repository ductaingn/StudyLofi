addEventListener('message', (event) => {
  const { timerValue } = event.data;
  const startTime = Date.now();

  let intervalId;

  const startTimer = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= timerValue && intervalId !== null) {
          clearInterval(intervalId);
          self.postMessage({ completed: true });
        }
      }, 1000); // Update every second
    }
  };

  startTimer();
});