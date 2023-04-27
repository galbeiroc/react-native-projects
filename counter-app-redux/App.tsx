import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import Counter from './src/components/Counter';

export default function App() {

  return (
    <Provider store={store}>
      <SafeAreaView>
        <Counter />
      </SafeAreaView>
    </Provider>
  );
}
