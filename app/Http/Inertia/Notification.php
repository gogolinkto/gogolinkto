<?php

namespace App\Http\Inertia;

use Illuminate\Support\Facades\Facade;

/** @mixin NotificationManager */
class Notification extends Facade
{
    protected static function getFacadeAccessor()
    {
        return NotificationManager::class;
    }
}
