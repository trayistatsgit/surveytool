import React, { useState } from 'react';
import './CreateSurvey.scss';
import PopupComponent from '../../atoms/popup/Popup';
import DragAndDrop from '../../components/dragAndDrop/DragAndDrop';

const CreateSurvey = () => {

  const[isPopUpVisible, setIsPopUpVisible] = useState(false);


  const showPopup = () => {
    setIsPopUpVisible(true);
  }

  const closePopup = () => {
    setIsPopUpVisible(false);
  }

	return (
		<>
			<section className='mainContainer'>
      <section className='containerCreateSurvey'>
				<section>
					<div className='addLogoHere'>
						<button className='addLogoBtn' onClick={showPopup}>Logo</button>
					</div>
				</section>

        {isPopUpVisible && <PopupComponent  showBottomCancel={true} onClose={closePopup} width={500} height={410}>
            <DragAndDrop />
          </PopupComponent>}
				<section className='surveyPage'>
					<div>
						<div className='surveyTitle'>
							<h1>
								<span>Untitled</span>
							</h1>
							<div>
								<button className='editBtn'>EDIT</button>
							</div>
						</div>
						<div className='surveyPageTitle'>
							<button className='pageTitle'>PAGE TITLE</button>
							<div>
								<button className='editPageBtn'>EDIT</button>
							</div>
						</div>
					</div>

					<div className='createQuestionContainer'>
						<div className='createQuestionNumber'>
							<span>Q1</span>
						</div>
						<span className='createQuestionInputOne'>
							<input className='createQuestionInputArea' type='text' placeholder='Enter Your Ques' />
						</span>
						<span>
							<select className='createQuestionInputTwo' name='cars'>
								<option className='createQuestionInput' value='volvo'>
									Volvo
								</option>
								<option value='saab'>Saab</option>
								<option value='mercedes'>Mercedes</option>
								<option value='audi'>Audi</option>
							</select>
						</span>
						<div>
							<span className='createQuestionToggle'>?</span>
						</div>
					</div>

					<div>
						<a className='demoText' href=''>
							Copy and paste questions
						</a>
					</div>

					<div className='createDoneContainer'>
						<span>
							<button className='createDoneButton'>Done</button>
						</span>
						<span>
							<button className='createEditButton'>EDIT</button>
						</span>
					</div>

					<div className='createFooterContainer'>
						<div className='createFooterDivOne'>
							<p className='createFooterParaOne'>Powered by</p>
							<b className='createFooterBold'>Survey Programming Tool</b>
							<p className='createFooterParaTwo'>
								See how easy it is to <a href=''>create survey and forms</a>
							</p>
						</div>

						<div >
							<button className='createFooterDivTwo'>Hide Footer</button>
						</div>
					</div>

					<div className='createPreviewContainer'>
						<button className='createPreviewButton'>Preview Survey</button>
					</div>
				</section>

        
			</section>
      </section>
		</>
	);
};

export default CreateSurvey;
