addEventListener('message', (event: MessageEvent<any>) => {
  const { timerValue }: { timerValue: number } = event.data;
  const startTime = Date.now();

  let intervalId: number | null = null;

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