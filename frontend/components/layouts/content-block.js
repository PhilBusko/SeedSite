/**************************************************************************************************
CONTENT BLOCK COMPONENT
**************************************************************************************************/
import React from 'react';
import './styles.scss'

class ContentBlock extends React.Component {
   render() {
      return (
         <div className='content-wrapper'>

            { this.props.children }

         </div>
      );
   }
}

export default ContentBlock;
