import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';
import { configureStore } from '@reduxjs/toolkit';
import { info } from '../reducers/info';
import { createWrapper } from 'next-redux-wrapper';

setupMSW();

const makeStore = () => {
  const store = configureStore({
    reducer : { info : info.reducer },
    devTools: process.env.NODE_ENV === 'development'
  });

  return store;
};

const store = makeStore();

function MyApp({ Component, pageProps,...rest }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <GlobalStyle />
      <Background />
      <Content>
        <Component {...pageProps} />
      </Content>
    </Provider>
  );
}

export type RootState = ReturnType<typeof store.getState>

const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === 'production'
});

export type AppStore = ReturnType<typeof makeStore>;

export default wrapper.withRedux(MyApp);

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
