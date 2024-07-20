import { useState, useEffect } from "react";
import './Сalculator.css';
import moon from '../icons/moon.svg';
import sun from '../icons/sun.svg';
import clearAll from '../icons/deleteAll.svg';
import clear from '../icons/deleteLast.svg';
import percent from '../icons/percent.svg';
import devide from '../icons/devision.svg';
import multiply from '../icons/multiply.svg';
import minus from '../icons/minus.svg';
import plus from '../icons/plus.svg';
import plusMinus from '../icons/plus_and_minus_symbols_27nk8zfave77.svg';
import comma from '../icons/comma_saeuzkw2lm5h.svg';
import equal from '../icons/equal.svg';


const Calculator =()=>{
    const [calculations, setCalculations] = useState("");
    const [result, setResult] = useState("");

    const СalculatorButton=(prop)=>{
        const styles = prop.color?{backgroundColor:prop.color}:{}
        return(
            <div style={styles} className='СalculatorButton' onClick={prop.onClickFunction} >
                {prop.val}
            </div>
        );
    }

    useEffect(()=>{
        setResult(lastNumberFrom(calculations)==-1?'':!isNaN(parseInt(calculations[calculations.length-1]))?String(eval(calculations)):result)},[calculations])

    const lastNumberFrom=(str, i=str.length-1)=>{
        while(!isNaN(parseInt(str[i])) || str[i]=='.'){
            i--
        }
        return i

    }
    const calculationsApdate=(e)=>{
        if(typeof e=='string' && e!='-' && calculations.length==0){return}
        if(typeof e=='string' && isNaN(parseInt(calculations[calculations.length-1])) && e!='%'){
            setCalculations(calculations.slice(0, -1)+e)
            return
        }
        if(e=='.'){
            let i=calculations.length-1
            while(!isNaN(parseInt(calculations[i]))){
                i--
            }
            if(calculations[i]=='.'){
                return
            }
        }
        if(e=='%'){
            let i=calculations.length-1
            if(isNaN(parseInt(calculations[i]))){
                i--
            }
            i=lastNumberFrom(calculations, i)
            let lastNumber=String(parseFloat(calculations.slice(i+1))/100)
            setCalculations(i==-1?lastNumber:calculations.slice(0, i+1)+lastNumber)
            return
        }
        setCalculations(calculations+e)
        
    }
    const signСhange=()=>{
        if(!isNaN(parseInt(calculations[calculations.length-1]))){
            let i=lastNumberFrom(calculations, calculations.length-1)
            if(calculations[i]=='-'){
                isNaN(parseInt(calculations[i-1]))?setCalculations(calculations.slice(0, i)+calculations.slice(i+1)):setCalculations(calculations.slice(0, i)+'+'+calculations.slice(i+1))
                return
            }
            if(calculations[i]=='+'){
                setCalculations(calculations.slice(0, i)+'-'+calculations.slice(i+1))
                return
            }
            setCalculations(calculations.slice(0, i+1)+'-'+calculations.slice(i+1))
            
        }
    }
    const calculationsClearing=()=>{
        setCalculations('')
    }
    const calculationsDeleteLast=()=>{
        setCalculations(calculations.slice(0, -1))
    }
    const equalFunction=()=>{
        setCalculations(result);
        setResult('')
    }
    const changeThema=(e)=>{
        if(e.target.alt=="Moon"){
            const element = document.getElementById('thema');
            element.src=sun
            element.alt="Sun"
            document.body.style.backgroundColor='black';
            document.body.style.color='white';
            const calc=document.getElementById('calculations');
            calc.style.backgroundColor='black';
            const res=document.getElementById('result');
            res.style.backgroundColor='black';
            res.style.color='white';
        }
        else{
            const element = document.getElementById('thema');
            element.src=moon
            element.alt="Moon"
            document.body.style.backgroundColor='white';
            document.body.style.color='black';
            const calc=document.getElementById('calculations');
            calc.style.backgroundColor='white';
            const res=document.getElementById('result');
            res.style.backgroundColor='white';
            res.style.color='black';
        }
        

    }
    const changeCalculations=(e)=>{
        setCalculations(e.target.value)
    }

    return <div id='conteiner'>
        <header> 
            <h3>Calculator</h3> 
            <img id='thema' src={moon} alt="Moon" onClick={changeThema}/>
        </header>
        <section>
            <input id="calculations" type='text' value={calculations} onChange={changeCalculations}/>
        </section>
        <section>
            <input disabled id="result" type='text'  value={result}/>
        </section>
        <div id="calculator">
            <СalculatorButton val={<img src={clearAll}/>} onClickFunction={calculationsClearing}/>
            <СalculatorButton val={<img src={clear}/>} onClickFunction={calculationsDeleteLast}/>
            <СalculatorButton color='white' val={<img src={percent}/>}  onClickFunction={()=>calculationsApdate('%')}/>
            <СalculatorButton color='white' val={<img src={devide}/>} onClickFunction={()=>calculationsApdate('/')}/>
            <СalculatorButton val={7} onClickFunction={()=>calculationsApdate(7)}/>
            <СalculatorButton val={8} onClickFunction={()=>calculationsApdate(8)}/>
            <СalculatorButton val={9} onClickFunction={()=>calculationsApdate(9)}/>
            <СalculatorButton color='white' val={<img src={multiply}/>} onClickFunction={()=>calculationsApdate('*')}/>
            <СalculatorButton val={4} onClickFunction={()=>calculationsApdate(4)}/>
            <СalculatorButton val={5} onClickFunction={()=>calculationsApdate(5)}/>
            <СalculatorButton val={6} onClickFunction={()=>calculationsApdate(6)}/>
            <СalculatorButton color='white' val={<img src={minus}/>} onClickFunction={()=>calculationsApdate('-')}/>
            <СalculatorButton val={1} onClickFunction={()=>calculationsApdate(1)}/>
            <СalculatorButton val={2} onClickFunction={()=>calculationsApdate(2)}/>
            <СalculatorButton val={3} onClickFunction={()=>calculationsApdate(3)}/>
            <СalculatorButton color='white' val={<img src={plus}/>} onClickFunction={()=>calculationsApdate('+')}/>
            <СalculatorButton val={<img src={plusMinus}/>} onClickFunction={signСhange}/>
            <СalculatorButton val={0} onClickFunction={()=>calculationsApdate(0)}/>
            <СalculatorButton val={<img src={comma}/>} onClickFunction={()=>calculationsApdate('.')}/>
            <СalculatorButton color='white' val={<img src={equal}/>} onClickFunction={equalFunction}/>
        </div>

    </div>
}
export default Calculator