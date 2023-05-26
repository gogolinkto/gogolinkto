<?php

namespace App\Http\Frontend\Facades;

use App\Http\Frontend\Notification\NotificationManager;
use Illuminate\Support\Facades\Facade;

/**
 * @mixin NotificationManager
 */
class Notification extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'frontend.notification';
    }
}
