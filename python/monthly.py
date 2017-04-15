# # #
#
#
# 04.15.2017
# # #


import smtplib
from email import mime
from email.mime import multipart

# Username for email account to log into
username = "info.cartracker@gmail.com"
# Password for email account to log into
password = "CarTracker123"
# Address to send mail from
fromaddr = "info.cartracker@gmail.com"
# Address to send mail to (@att.txt.net)
toaddr = "mikecrinite@gmail.com"


# Sends text message with report to toaddrs
def send(subject, body):
    # Format message
    msg = mime.multipart.MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = toaddr
    msg['Subject'] = subject
    msg.attach(mime.text.MIMEText(body, 'plain'))
    message = msg.as_string()

    # Send message
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()
    server.login(username, password)
    server.sendmail(fromaddr, toaddr, message)
    server.quit()

send("test", "test")
