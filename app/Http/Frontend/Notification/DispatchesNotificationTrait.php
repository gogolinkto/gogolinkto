<?php

namespace App\Http\Frontend\Notification;

use App\Http\Frontend\Facades\Notification;

trait DispatchesNotificationTrait
{
    public function dispatch(): void
    {
        Notification::dispatch($this);
    }
}
