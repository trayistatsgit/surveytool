import  React,{ useState } from 'react';
import TitleAtom from '../../../atoms/TitleAtom/TitleAtom';
import { Button, InputAtom, Typography } from '../../../blocks';
import './PageTitle.scss';


interface PageTitleProps {
    onCancel?:()=>void;
    onSave?:(title:string,description:string)=>void;
}


const PageTitle: React.FC<PageTitleProps> = ({onCancel,onSave}) => {
 
    const [Alignment,setAlignment] = useState<string>('');
    const [isBold, setBold] = useState<boolean>(false); // Toggle bold
    const [isItalic, setItalic] = useState<boolean>(false); // Toggle italic
    const [isUnderLined, setUnderLined] = useState<boolean>(false); // Toggle underline
    const [textAreaValue, setTextAreaValue] = useState<string>('');
    const [inputValue,setInputValue]  = useState<string>('');
  
    
  


    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value);
      };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
      };

      const handleSave = ()=>{
        if(onSave){
            onSave(inputValue,textAreaValue);
        }
        
      }
    const handleLeft = ()=>{
        setAlignment('left');
    }
    const handleCenter= ()=>{
        setAlignment('center');
    }
    const handleRight = ()=>{
        setAlignment('right');
    }
    const handleBold = ()=>{
        setBold(!isBold);
    }
    const handleItalic = ()=>{
       setItalic(!isItalic);
    }
    const handleUnderLine = ()=>{
        setUnderLined(!isUnderLined);
    }
   
  return (
    <div>
      <div className='Survey-title'>
        <Typography label="Page Title" fontSize='fontSize14' fontWeightstest={500} />
        <InputAtom
        onChange={handleInputChange}
        value={inputValue}
        />
        <Typography label="You are Good up to 250 characters" className='sub-text' fontWeight='bold' />
        <Typography label="Page Description" fontSize='fontSize14' fontWeightstest={500} />
         
         <div className="Page-description">
            <div className="page-description-buttons">
                <Button className='Page-description-button' color='black' label='Left' onClick={handleLeft} />
                <Button className='Page-description-button' color='black' label='Right'onClick={handleRight} />
                <Button className='Page-description-button' color='black' label='Center'onClick={handleCenter} />
                <Button className='Page-description-button' color='black' label='Bold' onClick={handleBold} />
                <Button className='Page-description-button' color='black' label='Italic' onClick={handleItalic}/>
                <Button className='Page-description-button' color='black' label='UnderLine' onClick={handleUnderLine} />
                <Button className='Page-description-button' color='black' label='Add Link'  />
            </div>
            
         <textarea 
         className={`Page-description-textarea-${Alignment}`}
        style={{fontWeight:isBold?'bold':"normal" ,fontSize:20,fontStyle:isItalic?'italic':"normal",textDecoration:isUnderLined?'underline':'none'}} 
         onChange={handleTextAreaChange}
          value={textAreaValue} 
           />
         </div>

        <TitleAtom  onCancel={onCancel} onSave={handleSave}/>
      </div>
    </div>
  );
};

export default PageTitle;