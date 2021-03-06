import * as React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import localeEn from 'react-intl/locale-data/en';
import localeRu from 'react-intl/locale-data/ru';
import { Route, Switch } from 'react-router';

import { Locales } from '@app/common/constants';
import { PagesRouter } from '@app/pages/PagesRouter';
import { Theme } from '@app/common/components/Theme';
import { LayoutContainer as Layout } from '@app/layout/LayoutContainer';
import { getBaseUrlByLocale } from '@app/common/helpers/getBaseUrlByLocale';

import messagesRu from '@translations/ru.json';
import messagesEn from '@translations/en.json';

addLocaleData([...localeRu, ...localeEn]);

const messages = {
  [Locales.RU]: messagesRu,
  [Locales.EN]: messagesEn,
};

export const BaseRouter: React.FC = () => (
  <Switch>
    {Object.values(Locales).map((locale: Locales) => (
      <Route
        key={locale}
        path={getBaseUrlByLocale(locale) + '/'}
        component={() => (
          <IntlProvider
            locale={locale}
            messages={messages[locale]}
          >
            <Theme>
              <Layout>
                <PagesRouter
                  basePath={getBaseUrlByLocale(locale)}
                />
              </Layout>
            </Theme>
          </IntlProvider>
        )}
      />
    ))}
  </Switch>
);
