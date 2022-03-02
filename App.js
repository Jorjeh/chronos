import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import imgCrono from './src/assets/crono.png';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App(){
  const [number, setNumber] = useState(0);
  const [button, setButton] = useState('Iniciar');
  const [last, setLast] = useState(null);

  function iniciar(){
    if (timer !== null){
      clearInterval(timer);
      timer = null;
      setButton('Iniciar');
    } else {
      timer = setInterval(() => {
        ss++;
        if (ss == 60){
          ss = 0;
          mm++;
        }

        if (mm == 60){
          mm = 0;
          hh++;
        }

        let format = (hh< 10 ? '0' + hh : hh) + ':'
        + (mm< 10 ? '0' + mm : mm) + ':'
        + (ss< 10 ? '0' + ss : ss); 
        
        setNumber(format);
      }, 1000);
      setButton('Parar');
    }
  }

  function parada(){
    if (timer !== null){
      clearInterval(timer);
      timer = null;
    }
    setLast(number);
    setNumber(0);
    let ss = 0;
    let mm = 0;
    let hh = 0;
    setButton('Iniciar');
  }

  return(
    <View style={styles.container}>
      <Image
        source = {imgCrono}
      />
   
      <Text
        style={styles.timer}
      >
        {number}
      </Text>

      <View style={styles.btnArea}>

        {/* botao INICIAR */}
        <TouchableOpacity 
          style={styles.btn}
          onPress={iniciar}
        
        >
          <Text style={styles.btnText}>{button}</Text>
        </TouchableOpacity>

        {/* botao PARAR */}
        <TouchableOpacity 
          style={styles.btn}
          onPress={parada}
        >
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text
          style={styles.ultimo}
        >
          {last ? 'Último tempo: ' + last: ''}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  footer: {
    marginTop: 40,
  },
  ultimo: {
    fontSize: 25,
    color: '#fff',
    fontStyle: 'italic'
  }
});