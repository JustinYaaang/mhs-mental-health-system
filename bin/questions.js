exports.q1 = {
  "title": "Triage Form",
  "description": "Please complete the form below",
  "is_published": true,
  "is_public": true,
  "body": {
    "title": "Triage Form",
    "description": "Please complete the form below",
    "pages": [{
      "name": "page1",
      "elements": [{
        "type": "text",
        "name": "question1",
        "title": "Your First Name"
      }, {
        "type": "text",
        "name": "question2",
        "title": "1.  Your Surname"
      }, {
        "type": "dropdown",
        "name": "question3",
        "title": "Your Gender",
        "choices": [{
          "value": "item1",
          "text": "Male"
        }, {
          "value": "item2",
          "text": "Female"
        }, {
          "value": "item3",
          "text": "Transgerer"
        }]
      }, {
        "type": "text",
        "name": "question5",
        "title": "Your Date of Birth"
      }, {
        "type": "text",
        "name": "question7",
        "title": "Your address"
      }, {
        "type": "dropdown",
        "name": "question6",
        "title": "The GP with whom you are registered",
        "choices": ["item1", "item2", "item3"]
      }, {
        "type": "dropdown",
        "name": "question8",
        "title": "Your preferred method of contact",
        "choices": [{
          "value": "item1",
          "text": "Post"
        }, {
          "value": "item2",
          "text": "Email"
        }, {
          "value": "item3",
          "text": "Text"
        }, {
          "value": "item4",
          "text": "Phone (including its answer machine)"
        }]
      }, {
        "type": "text",
        "name": "question18",
        "title": "Details of your preferred method of contact"
      }, {
        "type": "checkbox",
        "name": "question9",
        "title": "We need to know about your thoughts and feelings to understand how we can help you.  Have you constantly felt you cannot control any of the feelings below over the past two weeks",
        "choices": [{
          "value": "item1",
          "text": "Being Low / Depressed"
        }, {
          "value": "item2",
          "text": "Anxiety"
        }, {
          "value": "item3",
          "text": "Panic"
        }, {
          "value": "item4",
          "text": "Negative thoughts"
        }, {
          "value": "item5",
          "text": "Negative impluses"
        }]
      }, {
        "type": "comment",
        "name": "question4",
        "title": "What thoughts or actions do you feel may be triggering you to feel this way?"
      }, {
        "type": "checkbox",
        "name": "question15",
        "title": "Do you think that recent changes in any of the following life pressures is triggering your feelings?",
        "choices": [{
          "value": "item1",
          "text": "A death in your family"
        }, {
          "value": "item2",
          "text": "An increasing demand on you to look after another person(s)"
        }, {
          "value": "item4",
          "text": "A housing problem"
        }, {
          "value": "item5",
          "text": "An employment related problem"
        }, {
          "value": "item6",
          "text": "A crime committed against you (including domestic abuse)"
        }, {
          "value": "item7",
          "text": "A pregnancy"
        }, {
          "value": "item8",
          "text": "The need to look after one or more children under the age of 1"
        }, {
          "value": "item9",
          "text": "Dependancy on alchohol"
        }, {
          "value": "item10",
          "text": "Dependancy on street drugs"
        }, {
          "value": "item11",
          "text": "Dependancy on nicotine"
        }]
      }, {
        "type": "comment",
        "name": "question10",
        "title": "What are you doing to help you cope with these feelings?"
      }, {
        "type": "comment",
        "name": "question11",
        "title": "How are these feelings affecting your life?"
      }, {
        "type": "checkbox",
        "name": "question12",
        "title": "If these feelings did not exist, what would could you enjoy that you do not enjoy now",
        "choices": [{
          "value": "item1",
          "text": "A working life"
        }, {
          "value": "item2",
          "text": "A family life"
        }, {
          "value": "item3",
          "text": "A Social & Leisure life"
        }, {
          "value": "item4",
          "text": "A Private life"
        }, {
          "value": "item5",
          "text": "Close relationships"
        }]
      }, {
        "type": "checkbox",
        "name": "question13",
        "title": "To understand who to signpost you to it would be helpful to understand if you have been diagnosed as any of the following: ",
        "choices": [{
          "value": "item1",
          "text": "Long term physical health issues"
        }, {
          "value": "item2",
          "text": "Long term mental health issues"
        }]
      }, {
        "type": "comment",
        "name": "question14",
        "title": "If you have a long term condition please provide more details, including and any therapy or medication that have been prescribed for you?"
      }, {
        "type": "matrix",
        "name": "question16",
        "title": "How often have you been bothered by the following over the past two weeks (leave blank if the answer is not at all)",
        "columns": [{
          "value": "item1_1",
          "text": "Several days"
        }, {
          "value": "item2_2",
          "text": "More that half of the days"
        }, {
          "value": "item3_3",
          "text": "Nearly every day"
        }],
        "rows": ["Feeling anxious", "Uncontrollable worry", "Worrying about differing things", "An inability to relax", "An inability to sit still", "Being easily annoyed/Irritated", "Afraid something awful will happen"]
      }, {
        "type": "checkbox",
        "name": "question17",
        "title": "As you may expect, we are required to understand if you are at immediate risk to yourself or others.  Please pardon the directness of these questions.  Please tick the following if they true.",
        "choices": [{
          "value": "item1_1",
          "text": "Over the past 4 weeks have things got so bad that I have had thoughts about physically hurting myself or others.  "
        }, {
          "value": "item2_1",
          "text": "I have made plans to act upon these thoughts"
        }, {
          "value": "item3_1",
          "text": "I have acted upon such plans in the past"
        }]
      }]
    }]
  },
  "role": "FORM1",
  "rules": {
    "RED": [],
    "GREEN": []
  },
  "__v": 0
}

exports.q2 = {
  "title": "Form 1: digital IAPT working group",
  "description": "To make an online self-referral to London IAPT services.",
  "is_published": true,
  "is_public": true,
  "body": {
    "title": "Form 1: digital IAPT working group",
    "description": "To make an online self-referral to London IAPT services.",
    "pages": [{
      "name": "Page 1",
      "elements": [{
        "type": "text",
        "name": "question1",
        "title": "First name",
        "isRequired": true
      }, {
        "type": "text",
        "name": "question2",
        "title": "Surname (family name)",
        "isRequired": true
      }, {
        "type": "text",
        "name": "question4",
        "title": "Date of Birth",
        "isRequired": true,
        "inputType": "date"
      }, {
        "type": "text",
        "name": "question3",
        "title": "Name of GP surgery",
        "isRequired": true,
        "hint": "Please provide the name of your GP surgery."
      }, {
        "type": "dropdown",
        "name": "question5",
        "title": "Gender",
        "isRequired": true,
        "choices": [{
          "value": "item1",
          "text": "Male "
        }, {
          "value": "item2",
          "text": "Female"
        }, {
          "value": "item3",
          "text": "Not specified"
        }]
      }, {
        "type": "text",
        "name": "question6",
        "title": "Address",
        "isRequired": true,
        "maxLength": 7
      }, {
        "type": "text",
        "name": "question7",
        "title": "Postcode",
        "isRequired": true,
        "size": 7,
        "maxLength": 7
      }, {
        "type": "text",
        "name": "question13",
        "title": "Mobile telephone number",
        "inputType": "tel"
      }, {
        "type": "radiogroup",
        "name": "question14",
        "visibleIf": "{question13} notempty",
        "title": "Can we leave a voicemail on this number?",
        "choices": [{
          "value": "item1",
          "text": "Yes"
        }, {
          "value": "item2",
          "text": "No"
        }]
      }, {
        "type": "text",
        "name": "question15",
        "title": "Home telephone number",
        "inputType": "tel"
      }, {
        "type": "radiogroup",
        "name": "question16",
        "visibleIf": "{question15} notempty",
        "title": "Can we leave a voicemail on this number?",
        "choices": [{
          "value": "item1",
          "text": "Yes"
        }, {
          "value": "item2",
          "text": "No"
        }]
      }, {
        "type": "text",
        "name": "question11",
        "title": "Email address",
        "validators": [{
          "type": "email"
        }],
        "inputType": "email"
      }, {
        "type": "radiogroup",
        "name": "question12",
        "title": "What is your preferred language or languages for speaking?",
        "hasOther": true,
        "choices": [{
          "value": "item1",
          "text": "English"
        }],
        "otherText": "Other (please list)"
      }, {
        "type": "radiogroup",
        "name": "question18",
        "visibleIf": "{question12} = \"other\"",
        "title": "Will you require an interpreter?",
        "choices": [{
          "value": "item1",
          "text": "Yes"
        }, {
          "value": "item2",
          "text": "No"
        }]
      }, {
        "type": "html",
        "name": "question19"
      }],
      "title": "Self-referral form",
      "description": "This is a referral form to make a referral to NHS psychological therapy services.\nThis form will be sent to your local service to manage your enquiry.\n\nInformation you provide will be stored securely by the NHS service in your local area.  If for any reason you are not able to complete this form please contact your local service for assistance (link to nhs.uk IAPT finder)\n\nThis first page of the form is asking for information about who you are, where you live and how we can contact you. "
    }, {
      "name": "Page 2",
      "elements": [{
        "type": "panel",
        "name": "Introduction",
        "elements": [{
          "type": "html",
          "name": "question21",
          "html": "In this section of the form we would like to know a bit more about what you are looking for help with. Please answer in as much detail as you feel comfortable with. <br>\n<br>\nInformation you provide will be stored securely by the NHS service in your local area. If for any reason you are not able to complete this form please contact your local service for assistance and advice."
        }],
        "title": "Understanding what you are looking for help with"
      }, {
        "type": "text",
        "name": "question8",
        "title": "What do you need support with at this time?",
        "isRequired": true
      }, {
        "type": "radiogroup",
        "name": "question9",
        "title": "Are you receiving help currently for your mental health (e.g. stress, anxiety, depression, low mood)?",
        "choices": [{
          "value": "item1",
          "text": "Yes"
        }, {
          "value": "item2",
          "text": "No"
        }, {
          "value": "item3",
          "text": "I do not wish to state"
        }]
      }, {
        "type": "comment",
        "name": "question10",
        "visibleIf": "{question9} = \"item1\"",
        "title": "Please provide details below:"
      }, {
        "type": "radiogroup",
        "name": "question17",
        "title": "How did you find out about this service?",
        "hasOther": true,
        "choices": [{
          "value": "item1",
          "text": "Word of mouth"
        }, {
          "value": "item2",
          "text": "NHS.uk website"
        }, {
          "value": "item3",
          "text": "Good Thinking website"
        }, {
          "value": "item4",
          "text": "GP or other health professional "
        }]
      }],
      "title": "Self-referral form"
    }],
    "showPrevButton": false,
    "showQuestionNumbers": "off",
    "showProgressBar": "bottom"
  },
  "role": "FORM1",
  "rules": {
    "RED": [],
    "GREEN": []
  },
  "__v": 0
}

exports.q3 = {
  "title": "Form 2: created by digital IAPT working group",
  "description": "This form would be sent to a service user to complete as part of the preparation for telephone call with the clinician. The form aims to reduce the amount of time asking repetitive questions and to allow for a more meaningful discussion with clinicians. ",
  "is_published": true,
  "is_public": true,
  "body": {
    "title": "Form 2: created by digital IAPT working group",
    "description": "This form would be sent to a service user to complete as part of the preparation for telephone call with the clinician. The form aims to reduce the amount of time asking repetitive questions and to allow for a more meaningful discussion with clinicians. ",
    "pages": [{
      "name": "page1",
      "elements": [{
        "type": "radiogroup",
        "name": "question1",
        "title": "Are you completing this for yourself or on behalf of someone else?",
        "isRequired": true,
        "choices": [{
          "value": "item1",
          "text": "For myself"
        }, {
          "value": "item2",
          "text": "On behalf of someone else"
        }]
      }, {
        "type": "radiogroup",
        "name": "question4",
        "visibleIf": "{question1} = \"item2\"",
        "title": "What is your relationship to the person who needs to fill in this form? ",
        "hasOther": true,
        "choices": ["Friend", "Family member", "GP"],
        "otherText": "Other  (please describe)"
      }, {
        "type": "text",
        "name": "question2",
        "visibleIf": "{question1} = [\"item2\"]",
        "title": "Please state your name:"
      }, {
        "type": "radiogroup",
        "name": "question5",
        "visibleIf": "{question1} = \"item2\"",
        "title": "Are you with the person who needs to complete this form?",
        "choices": ["Yes", "No"]
      }, {
        "type": "checkbox",
        "name": "question3",
        "title": "Ethnicity - which ethnic group do you identify with?",
        "choices": [{
          "value": "item1",
          "text": "White - British"
        }, {
          "value": "item2",
          "text": "White - Irish"
        }, {
          "value": "item3",
          "text": "White - Other"
        }, {
          "value": "item4",
          "text": "Mixed - White and Black African"
        }, {
          "value": "item5",
          "text": "Mixed - White and Asian"
        }, {
          "value": "item6",
          "text": "Mixed - White and Black Caribbean"
        }, {
          "value": "item7",
          "text": "Mixed - Other"
        }, {
          "value": "item8",
          "text": "Asian - Indian"
        }, {
          "value": "item9",
          "text": "Asian - Pakistani"
        }, {
          "value": "item10",
          "text": "Asian - Bangladeshi"
        }, {
          "value": "item11",
          "text": "Any other Asian background"
        }, {
          "value": "item12",
          "text": "Black - Caribbean"
        }, {
          "value": "item13",
          "text": "Black - African"
        }, {
          "value": "item14",
          "text": "Black - other"
        }, {
          "value": "item15",
          "text": "Chinese"
        }, {
          "value": "item16",
          "text": "Any other ethnic group"
        }, {
          "value": "item17",
          "text": "I do not wish to state"
        }],
        "otherText": "Mixed - White and Black Caribbean"
      }],
      "description": "Introduction: Welcome to your online assessment from the [NAME OF LOCAL IAPT TEAM] service.\nYou are receiving this form to complete ahead of your assessment with a clinician in the service. \n\nIn this online form you will be asked X questions to help us to know more about you and to understand how we can help. This should take you about 20- 25 minutes. \nIf you have any questions or difficulties completing the assessment you can contact us by telephone or [INSERT SERVICE CONTACT EMAIL/PHONE]. \n\nBefore starting we want to let you know what will happen to your information when you fill in this assessment. All information will be kept securely and confidentially by the NHS. The only exception would be if you tell us that either you or someone else is in danger.\nAny information you give us will be used for the purposes of your care and treatment planning.\n"
    }]
  },
  "role": "FORM1",
  "rules": {
    "RED": [],
    "GREEN": []
  },
  "__v": 0
}
