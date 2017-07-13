import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateActiveFont } from '../actions/actions';

const OPTION_HEIGHT = 25;
const OPTION_VERTICAL_PADDING = 5;
const OPTION_HORIZONTAL_PADDING = 20;
const OPTION_TOTAL_HEIGHT = (OPTION_VERTICAL_PADDING * 2) + OPTION_HEIGHT;

const ControlButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 10px;
`;

const ControlButton = styled.button`

`;

const OptionButton = styled.div`
  display: flex;
  align-items: center;
  height: ${OPTION_HEIGHT}px;
  padding: ${OPTION_VERTICAL_PADDING}px ${OPTION_HORIZONTAL_PADDING}px;
  outline: none;

  &:hover {
    background-color: orange;
  }
`;

const OptionsWrapper = styled.div`
  background-color: #0e83cd;
`;

const Options = styled.div`
  height: ${props => props.isOpen ? `${props.items * OPTION_TOTAL_HEIGHT}px` : "0px"};
  transition: height 0.5s ease-in-out;
  overflow-y: hidden;
`;

const CheckedOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;

  &:hover {
    background-color: orange;
  }
`;

class FontControlBar extends Component {

  constructor(props){
    super(props);

//use loadedMenu to trigger isOpen state
    this.state = {
      isOpen : false,
      loadedMenu : "default"
    }
  }

  changeMenuState(clicked){
    if(clicked === this.state.loadedMenu && this.state.isOpen){
      this.setState({...this.state.loadedMenu, isOpen : false}, () => {

      })
    } else {
      this.setState({isOpen: true, loadedMenu : clicked}, () => {

      });
    }
  }

  formatOption(option){
    let formattedOption = option;

    if(typeof option === 'string'){
      let tempFormat = option.replace(/(\d+)/g, (_, num) => {
        return ' ' + num + ' ';
      }).trim();
      formattedOption = tempFormat.replace(/(\b[a-z](?!\s))/g, x => x.toUpperCase());
    }

    if(typeof option === 'number'){
      formattedOption += "%";
    }
    return formattedOption;
  }

  //why the hell do you need another div when you have a div dingus!? <i>!?!?!?</i>
  generateOptions(menu){
    return this.props[menu].map(option => {
      const baseOption = 
        <OptionButton 
          key={`${option}${this.props.type}`} 
          onClick={() => this.props.dispatch(updateActiveFont(option, this.props.type, menu))}
        >
          {this.formatOption(option)}
        </OptionButton>;

      if(option === this.props.category || option === this.props.variant || option === this.props.size){
        return (
        <CheckedOption key={`checked${option}${this.props.type}`}>
          {baseOption}
          <i className="fa fa-check fa-lg" aria-hidden="true"></i>
        </CheckedOption>
        );
      }else{
        return baseOption;
      }
    });
  }


  render() {
    const type = this.props;

    return (
      <div>
        <ControlButtonsWrapper>
          <ControlButton onClick={() => this.changeMenuState("category")}>
            <i className="fa fa-list fa-lg" aria-hidden="true"></i> {type.currentCategory}
          </ControlButton>
          <ControlButton onClick={() => this.changeMenuState("variant")}>
            <i className="fa fa-italic fa-lg" aria-hidden="true"></i> {type.currentVariant}
          </ControlButton>
          <ControlButton onClick={() => this.changeMenuState("size")}>
            <i className="fa fa-text-height fa-lg" aria-hidden="true"></i> {type.currentSize}%
          </ControlButton>
        </ControlButtonsWrapper>

        <OptionsWrapper>
          <Options isOpen={this.state.isOpen} items={this.props[this.state.loadedMenu].length}>
            {this.generateOptions(this.state.loadedMenu)}
          </Options>
        </OptionsWrapper>
      </div>
    );
  }
}

const mapState = ({ appState }, ownProps) => {
  const activeFont = appState.activeFonts[ownProps.type];
  
  return {
    currentVariant : activeFont.variant,
    currentSize : activeFont.size,
    currentCategory : activeFont.category,
    variant : activeFont.availableVariants,
    size : appState.sizes,
    category : appState.categories,
    default : []
  }
};

export default connect(mapState)(FontControlBar);