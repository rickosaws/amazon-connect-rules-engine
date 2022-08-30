// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 *  This is here to load every file at during testing,
 * this will highlight the coverage for missing files.
 *
 * This is because nyc/instanbul only runs
 * coverage on files that are loaded by mocha. If we
* load all files, we can track coverage across the whole project to highlight gaps
 *
 * If a file is removed, this will throw an error,
 * and thus that file would need to be removed here also
 */
describe('It should require all testable files in the project to check covrage!', function() {
        //Utils
        require('../lambda/utils/DynamoUtils.js')
        require('../lambda/utils/CloudWatchUtils.js')
        require('../lambda/utils/CommonUtils.js')
        require('../lambda/utils/ConfigUtils.js')
        require('../lambda/utils/ErrorCodeUtils.js')
        require('../lambda/utils/HandlebarsUtils.js')
        require('../lambda/utils/InferenceUtils.js')
        require('../lambda/utils/LambdaUtils.js')
        require('../lambda/utils/LexUtils.js')
        require('../lambda/utils/MockUtils.js')
        require('../lambda/utils/OperatingHoursUtils.js')
        require('../lambda/utils/PollyUtils.js')
        require('../lambda/utils/RequestUtils.js')
        require('../lambda/utils/RulesEngine.js')
        require('../lambda/utils/S3Utils.js')
        require('../lambda/utils/SNSUtils.js')

        //Lambdas
        require("../lambda/BackupRulesetsAndTests.js")
        require("../lambda/BatchInferenceStart.js")
        require("../lambda/BatchInferenceRunner.js")
        require("../lambda/CacheConnectData.js")
        require("../lambda/CloneRule.js")
        require("../lambda/CloneRuleSet.js")
        require("../lambda/CopyTests.js")
        require("../lambda/ConnectCheckTimeout.js")
        require("../lambda/ConnectCreateCallback.js")
        require("../lambda/ConnectCreateCallHistory.js")
        require("../lambda/ConnectDeleteCallback.js")
        require("../lambda/ConnectDTMFInput.js")
        require("../lambda/ConnectDTMFMenu.js")
        require("../lambda/ConnectGetCallbackStatus.js")
        require("../lambda/ConnectIntegrationStart.js")
        require("../lambda/ConnectLoadState.js")
        require("../lambda/ConnectNLUMenu.js")
        require("../lambda/ConnectPromptsOnHold.js")
        require("../lambda/ConnectRulesInference.js")
        require("../lambda/ConnectSendSMS.js")
        require("../lambda/ConnectUpdateState.js")
        require("../lambda/CreateContactFlow.js")
        require("../lambda/CreateEndPoint.js")
        require("../lambda/CreateHoliday.js")
        require("../lambda/CreateRule.js")
        require("../lambda/CreateRuleSet.js")
        require("../lambda/CreateTest.js")
        require("../lambda/CreateUser.js")
        require("../lambda/CreateWeight.js")
        require("../lambda/DeleteObject.js")
        require("../lambda/DescribeLexBot.js")
        require("../lambda/GetBatches.js")
        require("../lambda/GetConnectData.js")
        require("../lambda/GetEndPoints.js")
        require("../lambda/GetHolidays.js")
        require("../lambda/GetLastChange.js")
        require("../lambda/GetRule.js")
        require("../lambda/GetRuleSets.js")
        require("../lambda/GetRuleSetsForCSVExport.js")
        require("../lambda/GetRuleSetsForExport.js")
        require("../lambda/GetRuleSetsGraph.js")
        require("../lambda/GetSystemHealth.js")
        require("../lambda/GetTests.js")
        require("../lambda/GetUsers.js")
        require("../lambda/ImportRuleSets.js")
        require("../lambda/InteractiveInference.js")
        require("../lambda/InferenceAPI.js")
        require("../lambda/LexFulfillment.js")
        require("../lambda/MoveRuleSets.js")
        require("../lambda/RefreshConnectCache.js")
        require("../lambda/RenameRule.js")
        require("../lambda/RenameRuleSet.js")
        require("../lambda/SaveHoliday.js")
        require("../lambda/UpdateContactFlow.js")
        require("../lambda/UpdateEndPoint.js")
        require("../lambda/UpdateRule.js")
        require("../lambda/UpdateRuleSet.js")
        require("../lambda/UpdateTest.js")
        require("../lambda/UpdateUser.js")
        require("../lambda/UpdateWeight.js")
        require("../lambda/VerifyLogin.js")

        // Interactive handlers
        require("../lambda/interactive/Distribution.js")
        require("../lambda/interactive/DTMFInput.js")
        require("../lambda/interactive/DTMFMenu.js")
        require("../lambda/interactive/ExternalNumber.js")
        require("../lambda/interactive/Integration.js")
        require("../lambda/interactive/Message.js")
        require("../lambda/interactive/Metric.js")
        require("../lambda/interactive/NLUMenu.js")
        require("../lambda/interactive/Queue.js")
        require("../lambda/interactive/RuleSet.js")
        require("../lambda/interactive/SetAttributes.js")
        require("../lambda/interactive/SMSMessage.js")
        require("../lambda/interactive/Terminate.js")
        require("../lambda/interactive/UpdateStates.js")
});
