<?php

namespace App\Http\Frontend\Notification;

use Illuminate\Support\Str;

class NotificationManager
{
    /** @var array<NotificationContract> */
    private array $notifications = [];

    public function __construct()
    {
        $this->notifications = session()->get('frontend.notifications', []);
    }

    public function dispatch(NotificationContract $notification): self
    {
        $this->notifications[] = $notification;

        return $this;
    }

    public function share(): array
    {
        return collect($this->notifications)
            ->map(fn (NotificationContract $notification) => [
                'uuid' => Str::uuid(),
                'component' => $notification->getComponent(),
                'ttl' => $notification->getTtlSeconds(),
                'props' => $notification->getProps(),
            ])
            ->toArray();
    }

    public function flash(): void
    {
        session()->flash('frontend.notifications', $this->notifications);
    }
}
