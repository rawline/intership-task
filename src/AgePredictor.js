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

  const fetchAge = useCallback(async (name) => {

    if (name === lastRequestedName || name === '') return;

    let res = await fetch(`https://api.agify.io/?name=${name}`);
    let response = await res.json();
    setAge(`Predicted age: ${response.age}`);
    setLastRequestedName(name);
  }, [lastRequestedName]);

  useEffect(() => {
    if (name === lastRequestedName) return;

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
                  aria-labelledby="catFact-type"
                  id="catfact"
                  type="text"
                  name="catfact"
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

      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>
      {age && <p>{age}</p>}*/}
    </div> 
  );
}

export default AgePredictor;
