import { Button } from '../../blocks/button/ButtonAtom'
import React from 'react'
import './TitleAtom.scss';
 
 
interface TitleAtomProps {
  onCancel?: () => void;
  onSave?: () => void;
}
 
 
const TitleAtom:React.FC<TitleAtomProps> = ({onCancel,onSave}) => {
  return (
    <div className='main-title'>
      <div className='title-buttons'>
        <Button label='Cancel' className='Cancel-button'   color='black' onClick={onCancel}  />
        <Button label='Save' className='Save-button' onClick={onSave} />
      </div>
    </div>
  )
}
 
export default TitleAtom;