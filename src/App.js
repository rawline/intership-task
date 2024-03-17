// в этой файле реализовано задание с получением рандомных фактах о котах

import React, { useState } from 'react';
import {
  FormItem,
  Input,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

// сама реализация функции
function CatFact() {
  const [fact, setFact] = useState('');
  const textFieldRef = React.useRef(null);
  // работа с запросами выполнена с помощью fetchApi, в связи с проблемой с установкой рекомендуемых библиотек
  const fetchCatFact = async () => {
    let res = await fetch('https://catfact.ninja/fact');
    let response = await res.json();

    setFact(response.fact);
    // располагаем курсор после первого слова
    if (textFieldRef.current) {
      const firstSpaceIndex = response.fact.indexOf(' ') + 1;
      textFieldRef.current.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
    }
  };

  // возвращаем все необходимые компоненты
  return (
    
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormItem
                htmlFor="catFact"
                top="Cat fact"
              >

                <Input
                  aria-labelledby="catFact-type"
                  id="catfact"
                  type="catfact"
                  name="catfact"
                  value={fact}
                  onChange={(e) => setFact(e.target.value)}
                />
              </FormItem>

        <FormItem>
          <Button type="submit" size="l" stretched onClick={fetchCatFact}>
            Get Cat Fact
          </Button>
        </FormItem>
      </form>
    </div>
  );
}

export default CatFact;
