<?php

namespace App\Http\Frontend\Notification;

class SimpleNotification implements NotificationContract
{
    use DispatchesNotificationTrait;

    public int|null $ttl = null;

    public function __construct(
        public readonly string $type,
        public readonly string $title,
        public readonly string $message,
    ) {
    }

    public static function success(string $title, string $message): self
    {
        return new static('success', $title, $message);
    }

    public static function error(string $title, string $message): self
    {
        return new static('error', $title, $message);
    }

    public function autoCloseAfter(int $seconds): self
    {
        $this->ttl = $seconds;

        return $this;
    }

    public function getComponent(): string
    {
        return 'simple-notification';
    }

    public function getProps(): array
    {
        return [
            'type' => $this->type,
            'title' => $this->title,
            'message' => $this->message,
        ];
    }

    public function getTtlSeconds(): int|null
    {
        return $this->ttl;
    }
}
