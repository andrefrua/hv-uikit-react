*** Setting ***
Resource          _verticalNavigation.resource
Test Setup        Run Keywords
...               Go To    ${components}vertical-navigation--collapsable    AND
...               expand vertical navigation
Documentation     Test Cases based on Design System Version 1.2.0


*** Comments ***
complementary test cases:
- Test Suite "verticalNavigation_keyboard_interaction.robot"
- Test Case "escape: close vertical navigation menu when ESCAPE is pressed"


*** Test Cases ***
expand vertical navigation menu when burger is clicked
    Wait Until Element Is Visible    ${expanded}

close vertical navigation menu when it id opened and burger is clicked
    Click Element                        ${burger}
    Wait Until Element Is Not Visible    ${expanded}

does not close vertical anchor bar when vertical navigation menu is closed
    Click Element                        ${burger}
    Wait Until Element Is Not Visible    ${expanded}
    Element Should Be Visible            ${anchorBar}

closeOnExit property close menu when is clicked any area out of vertical navigation
    [Setup]    NONE
    Go To    ${components}vertical-navigation--collapse-on-exit
    expand vertical navigation
    Click Element                        css:body
    Wait Until Element Is Not Visible    ${items}

by default does not close menu when is clicked any area out of vertical navigation
    Click Element                css:body
    Element Should Be Visible    ${expanded}
