/*

Реализация тестового задания для прохождения на стажировку на место фронтэнд разработчика в команду ВК
задание выполнил Маматходжаев Рафаэль
В этой работе я использовал библиотку для построения графических интерфейсов vkui. 
*/

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  usePlatform,
  CellButton,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
// импорт необходимых функций, соответствующих двум условиям задачи
import CatFact from './App';
import AgePredictor from './AgePredictor';

const App = () => {
  const platform = usePlatform();

  const [main, setMainPanel] = React.useState('main');

  // главная логика происходит у нас в функции app
  // в данной реализации есть компоненет View и два компонента Platform
  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel={main}>
            <Panel id="main">
              <PanelHeader>Frontend intership task</PanelHeader>
              <Group header={<Header mode="secondary">Cat facts</Header>}>
                <CatFact />
                <CellButton onClick={() => setMainPanel('secondPanel')}>Age predictor page</CellButton>
              </Group>
            </Panel>
             
            <Panel id='secondPanel'>
            <PanelHeader>Frontend intership task</PanelHeader>
            <Group header={<Header mode="secondary">Age predictor</Header>}>
                <AgePredictor />
                <CellButton onClick={() => setMainPanel('main')}>Cat facts page</CellButton>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
// отрисовываем наш интерфейс, используя светлуую тему
root.render(
  <ConfigProvider appearance="light">
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
);