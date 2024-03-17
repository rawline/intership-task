import React, { useState } from 'react';
import {
  FormItem,
  Input,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

function CatFact() {
  const [fact, setFact] = useState('');
  const textFieldRef = React.useRef(null);

  const fetchCatFact = async () => {
    let res = await fetch('https://catfact.ninja/fact');
    let response = await res.json();

    setFact(response.fact);

    if (textFieldRef.current) {
      const firstSpaceIndex = response.fact.indexOf(' ') + 1;
      textFieldRef.current.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
    }
  };

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
      {/* <button onClick={fetchCatFact}>Get Cat Fact</button>
      <textarea ref={textFieldRef} value={fact} onChange={(e) => setFact(e.target.value)} /> */}
    </div>
  );
}

export default CatFact;
