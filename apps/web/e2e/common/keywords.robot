*** Settings ***
Library     SeleniumLibrary
Resource    environment.robot


*** Variables ***
${GLOBAL_WAIT_TIME}     ${5}


*** Keywords ***
Open browser with full screen
    Open Browser    ${WEB_URL}    ${WEB_BROWSER}
    Maximize Browser Window
    Set Selenium Timeout    ${GLOBAL_WAIT_TIME}

Login action with username and password
    [Arguments]    ${username}    ${password}
    Go To    ${WEB_URL}/login
    Wait Until Page Contains    เข้าสู่ระบบ

    Input Text    xpath=/html/body/div/div/div[2]/form/div/div/div[3]/div/div/input    ${username}
    Input Text    xpath=/html/body/div/div/div[2]/form/div/div/div[4]/div/div/input    ${password}
    Click Button    xpath=//*[@id="__next"]/div/div[2]/form/div/div/div[5]/div/button
