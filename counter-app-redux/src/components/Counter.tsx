import { Text, View, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import XButton from './XButton';
import { increment, decrement, incrementByAmount, decrementByAmount } from '../features/counter/counterSlice'; 

const Counter = () => {
  const { value } = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.textCounter}>Counter</Text>
      <Text style={styles.valueCounter}>{ value }</Text>
      <XButton onPress={() => dispatch(increment())} bgColor='green' name='Increment' />
      <XButton onPress={() => dispatch(decrement())} bgColor='red' name='Decrement' />
      <XButton onPress={() => dispatch(incrementByAmount(5))} bgColor='purple' name='Increment by 5' />
      <XButton onPress={() => dispatch(decrementByAmount(5))} bgColor='steelblue' name='Decrement by 5' />
    </View>
  )
}; 

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textCounter: {
    fontSize: 25,
    color: 'brown',
    marginVertical: 10
  },
  valueCounter: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default Counter;
