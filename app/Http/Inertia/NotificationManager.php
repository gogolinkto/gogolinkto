<?php

namespace App\Http\Inertia;

class NotificationManager
{
    private array $notifications = [];

    public function __construct()
    {
    }

    public function success(string $title, string $message, string $group = null)
    {
        $this->message('success', $title, $message, $group);
    }

    public function message(string $type, string $title, string $message, string $group = null)
    {
        $this->notifications[] = [
            'type' => $type,
            'title' => $title,
            'message' => $message,
            'group' => $group,
            'disappearAfter' => 5000,
        ];
    }

    public function flash(): void
    {
        if (count($this->notifications) === 0) {
            return;
        }

        session()->flash('notifications', $this->notifications);
    }

    public function recover(): array
    {
        return session()->get('notifications', []);
    }
}
