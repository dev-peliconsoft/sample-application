import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectAmountMoney,
  makeSelectAccountBalanceHistory,
  makeSelectCurrencyName,
} from 'containers/DashboardPage/selectors';
import { makeSelectIsLoading } from 'providers/LoadingProvider/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from 'utils';
import Widget from 'components/App/Widget';
import { FormattedMessage } from 'react-intl';
import { GET_AVAILABLE_FUNDS_REQUEST } from 'containers/DashboardPage/constants';
import { getRequestName } from 'helpers';
import { getAvailableFundsAction } from 'containers/DashboardPage/actions';
import messages from './messages';

const stateSelector = createStructuredSelector({
  amountMoney: makeSelectAmountMoney(),
  accountBalanceHistory: makeSelectAccountBalanceHistory(),
  currencyName: makeSelectCurrencyName(),
  isLoading: makeSelectIsLoading(getRequestName(GET_AVAILABLE_FUNDS_REQUEST)),
});

export default function AvailableFunds() {
  const dispatch = useDispatch();
  const {
    amountMoney,
    accountBalanceHistory,
    currencyName,
    isLoading,
  } = useSelector(stateSelector);

  const getAvailableFunds = () => dispatch(getAvailableFundsAction());

  useEffect(() => {
    getAvailableFunds();
  }, []);  

  return (
    <FormattedMessage {...messages.availableFunds}>
      {(title) => (
        <Widget
          isLoading={isLoading}          
          title={title}
          content={amountMoney}
          unit={currencyName}
        />
      )}
    </FormattedMessage>
  );
}
