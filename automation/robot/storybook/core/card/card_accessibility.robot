*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=corecard--


*** Test Cases ***
selectable card against WCAG2AA standard       ${url}selectable
no selectable card against WCAG2AA standard    ${url}no-selectable

