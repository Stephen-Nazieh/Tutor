import { notify, getNotificationChannels, type NotificationType } from '@/lib/notifications/notify'
import { emitToUser, isUserOnline } from '@/lib/socket-server-enhanced'

export async function sendMentionNotification(params: {
  mentioneeId: string
  mentionerId: string
  mentionerName?: string
  messageId: string
  actionUrl?: string
}) {
  const { mentioneeId, mentionerName, messageId, actionUrl } = params
  const channels = await getNotificationChannels(mentioneeId, 'mention')
  if (!channels.inApp && !channels.email && !channels.push) return

  const title = 'You were mentioned'
  const message = mentionerName
    ? `${mentionerName} mentioned you`
    : 'You were mentioned in a message'

  const record = await notify({
    userId: mentioneeId,
    type: 'mention' as NotificationType,
    title,
    message,
    data: { messageId },
    actionUrl,
  })

  if (channels.push && isUserOnline(mentioneeId)) {
    emitToUser(mentioneeId, 'notification:mention', {
      id: record?.notificationId ?? null,
      messageId,
      title,
      message,
      actionUrl,
    })
  }
}
