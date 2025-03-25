import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

const App = () => {
  const [percentage, setPercentage] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canceled, setCanceled] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    let intervalId;

    const updateProgress = () => {
      if (percentage < 100 && !canceled) {
        setPercentage((prev) => prev + 1);
      }
    };

    intervalId = setInterval(updateProgress, 100);
    try {
      const response = await fetch('https://fakeapi.extendclass.com/countries');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      clearInterval(intervalId);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCanceled(true);
    setPercentage(0);
    setData(null);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>Загрузка данных</h1>
      <ProgressBar
        title="Загрузка отменена"
        percentage={percentage}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default App;