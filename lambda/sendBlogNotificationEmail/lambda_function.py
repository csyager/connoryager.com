import json
import boto3

ses = boto3.client('sesv2')

def lambda_handler(event, context):
    title = event['title']
    url = event['url']
    additional_message = event['additional_message']
    contacts = ses.list_contacts(
        ContactListName='BlogContactList',
        Filter={
            'FilteredStatus': 'OPT_IN'
        }
    )
    successes = []
    failures = []
    for contact in contacts['Contacts']:
        email_address = contact['EmailAddress']
        response = ses.send_email(
            FromEmailAddress='notification@connoryager.com',
            Destination={
                'ToAddresses': [
                    email_address
                ]
            },
            ReplyToAddresses=[
                'connoryager4@gmail.com'    
            ],
            FeedbackForwardingEmailAddress='connoryager4@gmail.com',
            Content={
                'Template': {
                    'TemplateName': 'PostNotificationTemplate',
                    'TemplateData': f"{{ \"title\":\"{title}\", \"url\":\"{url}\", \"additional_message\":\"{additional_message}\" }}"
                }
            },
            ListManagementOptions={
                'ContactListName': 'BlogContactList',
                'TopicName': 'BlogPosts'
            }
        )
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            successes.append(email_address)
        else:
            failures.append(email_address)
        
    return {
        'statusCode': 200,
        'body': json.dumps({
            'successes': successes,
            'failures': failures
        })
    }
