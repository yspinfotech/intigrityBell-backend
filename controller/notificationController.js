const User = require('../model/User');
// Note: We need firebase-admin for this, which might not be installed yet.
// However, I will write the logic assuming it will be there.
let admin;
try {
    admin = require('firebase-admin');
} catch (e) {
    console.warn('Firebase-admin not installed. FCM notifications will not be sent.');
}

const scheduleNotification = async (req, res) => {
    const { title, body, userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user || !user.fcmToken) {
            return res.status(404).json({ message: 'User or FCM token not found' });
        }

        if (admin) {
            const message = {
                notification: {
                    title: title,
                    body: body,
                },
                token: user.fcmToken,
            };

            await admin.messaging().send(message);
            res.json({ message: 'Notification scheduled/sent' });
        } else {
            res.status(500).json({ message: 'Firebase Admin not configured' });
        }
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ message: 'Error sending notification' });
    }
};

module.exports = { scheduleNotification };
