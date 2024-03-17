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
import CatFact from './App';
import AgePredictor from './AgePredictor';

const App = () => {
  const platform = usePlatform();

  const [main, setMainPanel] = React.useState('main');

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
root.render(
  <ConfigProvider appearance="light">
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
);