import React, { Component }             from 'react';
import styled                           from 'styled-components';

const StyledMain = styled.main`
  display:                              flex;
  flex-direction:                       column;
  width:                                100vw;
  color:                                white;
`;

//put generation in a lifecycle function
class TemplateBuilder extends Component {

  generateTemplate(template){
    const generatedTemplate = [];

    for(let current in template){
      const currentRow = template[current];

      const Row = styled.div`
        display: flex;
        ${ currentRow.rowStyle }
      `;

      const InnerWrapper = styled.div`
        ${ currentRow.row.wrapper ? currentRow.row.wrapper.baseStyle : undefined }
        ${ currentRow.row.wrapper ? this.generateInnerMedias(currentRow.row.wrapper.medias) : undefined }
      `;

      generatedTemplate.push(
        <Row key={ `Row${current}` }>
          { currentRow.row.wrapper ? <InnerWrapper key={ `${current}Inner` }> { currentRow.row.elements } </InnerWrapper> : currentRow.row.elements }
        </Row>
      );
    }
    return generatedTemplate;
  }

  generateInnerMedias(medias){
    let queries = ``;

    for(let media in medias){
      queries += `
        @media only screen and (min-width: ${media}px){
          ${medias[media]}
        }
      `;
    }

    return queries;
  }

  render() { 
    return (
      <StyledMain>
        { this.generateTemplate(this.props.template) }
      </StyledMain>
    );
  }
}

export default TemplateBuilder;