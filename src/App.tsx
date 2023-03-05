import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "@components/ui/AppLayout";
import { LoginPage } from "@components/pages/LoginPage";
import { PageRouter } from "@enums/page-router.enum";
import { IntentionsPreviewPage } from "@components/pages/Intentions/IntentionsPreviewPage";
import { IntentionsEditPage } from "@components/pages/Intentions/IntentionsEditPage";
import { getDataFrom } from "@utils/network/get-data-from";
import { AnnouncementEditPage } from "@components/pages/announcement/AnnouncementEditPage";
import { AnnouncementPreviewPage } from "@components/pages/announcement/AnnouncementPreviewPage";
import { checkAuth } from "@utils/network/check-auth";
import { UserCurrentPage } from "@components/pages/users/UserCurrentPage";
import { NotFoundPage } from "@components/pages/NotFoundPage";
import { ErrorPage } from "@components/pages/ErrorPage";
import {HomePage} from "@components/pages/HomePage";
import {UserListPage} from "@components/pages/users/UserListPage";
import {GalleryPage} from "@components/pages/GalleryPage";

const routers = createBrowserRouter([
  {
    path: PageRouter.Login,
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    loader: checkAuth,
    children: [
      {
        index:true,
        element:<HomePage/>
      },
      {
        path: PageRouter.IntentionsPreview,
        element: <IntentionsPreviewPage />,
        loader: () => getDataFrom(PageRouter.Intentions),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.IntentionsEdit,
        element: <IntentionsEditPage />,
        loader: () => getDataFrom(PageRouter.Intentions),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.AnnouncementEdit,
        element: <AnnouncementEditPage />,
        loader: () => getDataFrom(PageRouter.Announcement),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.AnnouncementPreview,
        element: <AnnouncementPreviewPage />,
        loader: () => getDataFrom(PageRouter.Announcement),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.UserCurrent,
        element: <UserCurrentPage />,
        loader: () => getDataFrom(PageRouter.UserCurrent),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.Users,
        element: <UserListPage />,
        loader: () => getDataFrom(PageRouter.Users),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.Gallery,
        element: <GalleryPage />,
        // loader: () => getDataFrom(PageRouter.Users),
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;
