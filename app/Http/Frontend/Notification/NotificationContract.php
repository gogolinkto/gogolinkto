<?php

namespace App\Http\Frontend\Notification;
interface NotificationContract
{
    public function getComponent(): string;

    public function getProps(): array;

    public function getTtlSeconds(): int|null;
}
