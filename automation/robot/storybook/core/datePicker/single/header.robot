*** Setting ***
Resource         ../_datePicker.resource
Test Setup       Open DatePicker sample    with-actions
Documentation    Use Cases:
...              - Date picker header should display the date selected or the range,
...                even if it is still being picked
Force Tags       v3


*** Test Cases ***
pick a date
    Click Element             ${day}\[7]
    Element Text Should Be    ${datePickerHeader}    7 Feb 1970

input a date
    Force input               ${input}    12 07 1982
    Press Keys                NONE    TAB
    Element Text Should Be    ${datePickerHeader}    7 Dec 1982

input locale pt-PT date
    [Setup]    Open DatePicker sample     localized
    Force input                ${input}      20/08/2014
    Press Keys                 NONE    ENTER
    Element Text Should Be     ${datePickerHeader}    20 ago. 2014

input and pick a date
    Force input               ${input}    02/07/1977
    Press Keys                NONE    TAB
    Click Element             ${day}\[9]
    Element Text Should Be    ${datePickerHeader}    7 Feb 1977
