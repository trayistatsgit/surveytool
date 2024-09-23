import { Button } from '../../blocks/button/ButtonAtom'
import React from 'react'
import './TitleAtom.scss';

interface Props {
    child?:any;
}

const TitleAtom:React.FC<Props> = ({child}) => {
  return (
    <div className='main-title'>
        {child}
      <div className='title-buttons'>
        <Button label='Cancel' className='Cancel-button'   color='black' />
        <Button label='Save' className='Save-button' />
      </div>
    </div>
  )
}

export default TitleAtom;
