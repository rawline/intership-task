// реализация второй части задания с предсказанием возвраста по имени

import React, { useState, useEffect, useCallback } from 'react';
import {
  FormItem,
  Input,
  Button,
  Paragraph,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

function AgePredictor() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [timer, setTimer] = useState(null);
  const [lastRequestedName, setLastRequestedName] = useState('');

  // используем useCallback для того, что бы мы могли использовать функцию fetchAge в хуке useEffect
  const fetchAge = useCallback(async (name) => {

    if (name === lastRequestedName || name === '') return;

    // делаем запрос для получения предсказанного возвраста
    let res = await fetch(`https://api.agify.io/?name=${name}`);
    let response = await res.json();
    // задаем полю Age полученный возраст
    setAge(`Predicted age: ${response.age}`);
    setLastRequestedName(name);
  }, [lastRequestedName]);

  useEffect(() => {
    // если делается запрос с предыдущем именем, то запрос прерывается
    if (name === lastRequestedName) return;
    // вызываем fetchAge после трех секунд бездействия
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(() => fetchAge(name), 3000));

    return () => clearTimeout(timer);
  }, [fetchAge, name, age, timer, lastRequestedName, ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAge(name);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormItem
                htmlFor="agePredictor"
                top="Age predictor"
              >

                <Input
                  aria-labelledby="name-type"
                  id="catfact"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </FormItem>

        <FormItem>
          {age && <Paragraph weight="1">{age}</Paragraph>}
        </FormItem>

        <FormItem>
          <Button type="submit" size="l">
            Predict age
          </Button>
        </FormItem>
      </form>
    </div> 
  );
}

export default AgePredictor;
