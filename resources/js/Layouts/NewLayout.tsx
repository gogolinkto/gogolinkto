import React, {Fragment, useContext, useEffect, useState} from 'react'
import {Dialog, Menu, Transition} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    Cog6ToothIcon,
    FolderIcon,
    HomeIcon, PlusIcon,
    XMarkIcon,
    GlobeEuropeAfricaIcon,
    QrCodeIcon,
    ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'
import {ChevronDownIcon, MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import useTypedPage from "@/Hooks/useTypedPage";
import {Head, Link, router} from "@inertiajs/react";
import useRoute from "@/Hooks/useRoute";
import Logo from "@/Components/Logo";
import {useCurrentRoute} from "@/Hooks/useCurrentRoute";
import {NotificationContext} from "@/Contexts/notification";
import SimpleNotification from "@/Components/Notifications/SimpleNotification";
import {Team} from "@/types";
import NotificationCatcher from "@/Components/Notifications/NotificationCatcher";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

type NewLayoutProps = {
    title: string
    children: React.ReactNode
}

export default function NewLayout({ title, children }: NewLayoutProps) {
    const route = useRoute();
    const { isCurrentRoute } = useCurrentRoute();
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: HomeIcon, current: isCurrentRoute('dashboard') },
        { name: 'Explorer', href: '#', icon: FolderIcon, current: false },
        { name: 'Links', href: '#', icon: GlobeEuropeAfricaIcon, current: false },
        { name: 'QR Codes', href: '#', icon: QrCodeIcon, current: false },
        { name: 'Analytics', href: '#', icon: ArrowTrendingUpIcon, current: false },
    ];

    return (
        <>
            <Head title={title} />
            <NotificationCatcher />
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80"/>
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5"
                                                    onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                        <div className="flex items-center h-16 shrink-0 pt-7 pb-2">
                                            <Logo width="120px" />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-gray-50 text-blue-700'
                                                                            : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className={classNames(
                                                                            item.current ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-700',
                                                                            'h-6 w-6 shrink-0'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <TeamSwitcher />
                                                <TeamSettingsMenu />
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
                    <div
                        className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                        <div className="flex items-center justify-center h-28 shrink-0 pt-5">
                            <Logo />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-50 text-blue-700'
                                                            : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-700',
                                                            'h-6 w-6 shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                <TeamSwitcher />

                                <TeamSettingsMenu />
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div
                        className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                                onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                        </button>

                        {/* Separator */}
                        <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true"/>

                        <div className="flex items-center flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
                                <span>{ title }</span>
                            </div>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                </button>

                                {/* Separator */}
                                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true"/>

                                <ProfileDropdown />
                            </div>
                        </div>
                    </div>

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            { children }
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

function ProfileDropdown () {
    const route = useRoute();
    const page = useTypedPage();
    const user = page.props.auth.user;

    const userNavigation = [
        {name: 'Your profile', href: route('profile.show')},
    ];

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src={ user.profile_photo_url }
                    alt={ user.name }
                />
                <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        { user.name }
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </span>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                            {({active}) => (
                                <Link
                                    href={item.href}
                                    className={classNames(
                                        active ? 'bg-gray-50' : '',
                                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </Menu.Item>
                    ))}
                    <Menu.Item>
                        {({active}) => (
                            <Link
                                as="button"
                                method="post"
                                href={route('logout')}
                                className={classNames(
                                    active ? 'bg-gray-50' : '',
                                    'block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left'
                                )}
                            >
                                Sign out
                            </Link>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

function TeamSwitcher() {
    const route = useRoute();
    const page = useTypedPage();
    const notification = useContext(NotificationContext);
    const currentTeamId = page.props.auth.user.current_team_id;

    const teams = page.props.auth.user.all_teams.map((team) => ({
        id: team.id,
        name: team.name,
        initial: team.name.charAt(0).toUpperCase(),
        current: team.id === currentTeamId,
    }));

    async function changeTeam(teamId: number) {
        const team = teams.find((team) => team.id === teamId)!;

        await router.put(route('current-team.update', {
            team_id: team.id,
        }));

        notification.addNotification({
            group: 'change-team',
            component: (events) => {
                const description = `Your active team is now "${team.name}"`;
                return (
                    <SimpleNotification
                        type="success"
                        dismiss={events.dismiss}
                        title="You switched team!"
                        description={description}
                    />
                )
            },
            disappearAt: new Date().getTime() + 3000,
        });
    }

    return (
        <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
                {teams.map((team) => (
                    <li key={team.name}>
                        <button
                            onClick={() => changeTeam(team.id)}
                            className={classNames(
                                team.current
                                    ? 'bg-gray-50 text-blue-700'
                                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold block w-full'
                            )}
                        >
                          <span
                              className={classNames(
                                  team.current
                                      ? 'text-blue-700 border-indigo-600'
                                      : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-blue-700',
                                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                              )}
                          >
                            {team.initial}
                          </span>
                            <span className="truncate">{team.name}</span>
                        </button>
                    </li>
                ))}
                <li>
                    <Link
                        href={route('teams.create')}
                        className="group flex items-center gap-x-3 rounded-lg p-2 text-sm leading-6 text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-dashed"
                    >
                        <div className="flex items-center justify-center w-6 h-6">
                            <PlusIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                        </div>
                        <span className="truncate">Add a Team</span>
                    </Link>
                </li>
            </ul>
        </li>
    )
}

function TeamSettingsMenu() {
    const route = useRoute();
    const { isCurrentRoute } = useCurrentRoute();
    const page = useTypedPage();
    const currentTeam = page.props.auth.user.current_team;
    const canManageTeam = true;

    const isTeamSettingsRoute = isCurrentRoute('teams.show');

    return (canManageTeam && currentTeam) ? (
        <li className="mt-auto">
            <Link
                href={route('teams.show', currentTeam.id)}
                className={
                    classNames(isTeamSettingsRoute
                            ? 'bg-gray-50 text-blue-700'
                            : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )
                }
            >
                <Cog6ToothIcon
                    className={classNames(
                        isTeamSettingsRoute ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-700',
                        'h-6 w-6 shrink-0'
                    )}
                    aria-hidden="true"
                />
                Team Settings
            </Link>
        </li>
    ) : null;
}