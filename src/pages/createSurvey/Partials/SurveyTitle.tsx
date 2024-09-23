import React ,{useState} from 'react'
 import TitleAtom from '../../../atoms/TitleAtom/TitleAtom';
import { InputAtom, Typography } from '../../../blocks';
import { DropdownInput } from '../../../atoms/DropdownInputAtom/DropdownInput';
import './SurveyTitle.scss';


 const Main:React.FC = ()=>{

    const [selectedValue, setSelectedValue] = useState<string>('');
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(event.target.value);
	};
    const options = [
        {
            value:'Left-Alignment' , label:'Left-Alignment',
        
        },
        {
            value:'Center-Alignment' , label:'Center-Alignment',
        
        }
    ]

    const InputClass = selectedValue === 'Center-Alignment'?'Center-Alignment':'Left-Alignment';
    return (
        <div className='Survey-title'>
          <Typography label="Survey Title"  fontSize='fontSize14' fontWeight="bold" />
          <InputAtom  className={InputClass}/>
          <Typography label=" You  are Good up to 250 characters"  className='sub-text'  fontWeight='bold' />
          <Typography label="Alignment"   fontSize='fontSize14' />
          <DropdownInput 
          className='Alignment-section'
          placeholder='Text Alignment'
          value = {selectedValue}
          options ={options}
          onChange={handleChange}
          width='250px'
          height='40px'
          />
        </div>
    )
 }

const SurveyTitle:React.FC = () => {
  return (
    
   <TitleAtom child ={<Main/>}/>
    
  )
}

export default SurveyTitle;
