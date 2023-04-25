*** Settings ***
Library     SeleniumLibrary
Resource    ../common/Keywords.robot
Resource    ../common/environment.robot
Resource    ../testdata/auth.robot


*** Test Cases ***
TC2-1
    [Documentation]    Login with valid credential
    Open browser with full screen
    Register Valid Email with Password

    Login action with username and password    ${USER_VALID_EMAIL}    ${USER_VALID_PASSWORD}
    Wait Until Page Contains    สวัสดี คุณ ${USER_VALID_NAME}
    Close Browser

TC2-2
    [Documentation]    Login with wrong password
    Open browser with full screen
    Login action with username and password    ${USER_VALID_EMAIL}    ${USER_INCORRECT_PASSWORD}
    Wait Until Page Contains    อีเมลหรือรหัสผ่านไม่ถูกต้อง
    Close Browser

TC2-3
    [Documentation]    Login with invalid email which not in correct format
    Open browser with full screen
    Login action with username and password    ${USER_MALFORMAT_EMAIL}    ${USER_ANOTHER_INCORRECT_PASSWORD}
    Wait Until Element Contains
    ...    xpath=/html/body/div/div/div[2]/form/div/div/div[3]/div/p
    ...    รูปแบบอีเมลไม่ถูกต้อง
    Close Browser

TC2-4
    [Documentation]    Login with valid email but empty password
    Open browser with full screen
    Login action with username and password    ${USER_VALID_EMAIL}    ${EMPTY}
    Close Browser

TC2-5
    [Documentation]    Login with empty email and empty password
    Open browser with full screen
    Login action with username and password    ${EMPTY}    ${EMPTY}
    Sleep    1s
    Wait Until Page Does Not Contain    สวัสดี คุณ ${USER_VALID_NAME}
    Close Browser


*** Keywords ***
Register Valid Email with Password
    Go To    ${WEB_URL}/signup/casting
    Wait Until Page Contains    ผู้กำกับ
    Input Text    xpath=/html/body/div/div/div[2]/form/div/div/div[3]/div/div/input    ${USER_VALID_NAME}
    Input Text    xpath=/html/body/div/div/div[2]/form/div/div/div[5]/div/div/input    ${USER_VALID_SURNAME}
    Input Text    xpath=/html/body/div/div/div[2]/form/div/div/div[6]/div/div/input    ${USER_VALID_COMPANY}
    Input Text    xpath=/html/body/div/div/div[2]/form/div/div/div[7]/div/div/input    ${USER_VALID_COMPANY_NUMBER}

    Choose File    xpath=/html/body/div/div/div[2]/form/div/div/div[8]/div/label/input    ${USER_TEST_IMAGE_PATH}

    Wait Until Element Contains
    ...    xpath=//*[@id="__next"]/div/div[2]/form/div/div/div[8]/div/h6/a
    ...    ${USER_TEST_IMAGE_NAME}

    Input Text    xpath=/html/body/div/div/div[2]/form/div/div/div[10]/div/div/input    ${USER_VALID_EMAIL}
    Input Password    xpath=/html/body/div/div/div[2]/form/div/div/div[11]/div/div/input    ${USER_VALID_PASSWORD}
    Input Password    xpath=/html/body/div/div/div[2]/form/div/div/div[12]/div/div/input    ${USER_VALID_PASSWORD}

    Click Button    xpath=//*[@id="__next"]/div/div[2]/form/div/div/div[13]/div/button
    Sleep    1s
